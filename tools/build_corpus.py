"""Build the text corpus (corpus/) from the raw materials kept on the case branches.

Usage (from repo root):
  for b in alsolife how-AI-help-ASD 其他产品 神经多元人士的自主AI使用 追星星的AI; do
    mkdir -p /tmp/raw/$b; git archive origin/$b | tar -x -C /tmp/raw/$b --exclude='*_files/*' --exclude='*.mp4'
  done
  git show "origin/alsolife:AI个训机器人_files/index.html" > /tmp/alsolife_index.html
  pip install trafilatura beautifulsoup4 lxml   # pdftotext (poppler) also required
  python3 tools/build_corpus.py /tmp/raw /tmp/alsolife_index.html corpus

Then re-check corpus/inventory.csv by hand (it is curated, not generated).
"""
import sys, os, json, re, subprocess, trafilatura
sys.path.insert(0, os.path.dirname(__file__))
from bs4 import BeautifulSoup
raw, extra, out = sys.argv[1], sys.argv[2], sys.argv[3]
def fb(html):
    s = BeautifulSoup(html,'lxml')
    for t in s(['script','style','noscript','svg','iframe']): t.decompose()
    c = s.select_one('#js_content') or s.select_one('article') or s.body
    o=[]
    for l in (x.strip() for x in c.get_text('\n').split('\n')):
        if len(l)>=2 and not l.startswith('<__hrp__') and (not o or o[-1]!=l): o.append(l)
    return '\n'.join(o)
res=[]
for root,_,files in os.walk(raw):
    for f in sorted(files):
        p=os.path.join(root,f); rel=os.path.relpath(p,raw); branch=rel.split('/')[0]
        if f=='README.md' or not f.endswith(('.html','.md','.pdf')): continue
        meta={}; method=''
        if f.endswith('.html'):
            b=open(p,'rb').read(); import re as _r
            cs=_r.search(rb'charset=["\']?([A-Za-z0-9_-]+)',b[:5000]); enc=(cs.group(1).decode().lower() if cs else 'utf-8')
            enc='gb18030' if enc in ('gbk','gb2312','gb18030') else enc
            html=b.decode(enc,errors='ignore')
            txt=trafilatura.extract(html,include_tables=True,favor_recall=True) or ''; method='trafilatura'
            m=trafilatura.extract_metadata(html)
            if m: meta={k:getattr(m,k) for k in ('title','author','date','url') if getattr(m,k,None)}
            if len(txt)<1500: txt=fb(html); method='bs4 full-text fallback (may include page chrome)'
            if f=='AI个训机器人.html':
                txt+='\n\n---\n[Appended: text of AI个训机器人_files/index.html (product detail page)]\n\n'+fb(open(extra,encoding='utf-8').read())
        elif f.endswith('.pdf'):
            t=subprocess.run(['pdftotext','-raw',p,'-'],capture_output=True,text=True).stdout
            txt=re.sub(r'(?<![。！？”：])\n(?!\n)','',t); txt=re.sub(r'\n+','\n\n',txt); method='pdftotext -raw (newspaper page; line-joins automated, check against PDF)'
        else:
            txt=open(p,encoding='utf-8').read(); method='original markdown (Notion export)'
            if '* { margin' in txt[:3000]:
                txt=txt[txt.find('====='):]; txt=re.sub(r'!\[[^\]]*\]\([^)]*\)','',txt); txt=re.sub(r'\n{3,}','\n\n',txt); method='markdown export of WeChat article (CSS/images stripped)'
        # privacy + noise cleaning
        txt=re.sub(r'!\[[^\]]*\]\([^)]*\)','',txt)
        txt=re.sub(r'^\[\]\(http[^)]*\)\s*$','',txt,flags=re.M)
        txt=re.sub(r'https?://(www\.)?xiaohongshu\.com/user/profile/[^\s|)]*','[profile-url-removed]',txt)
        txt=re.sub(r'(xiaohongshu\.com/(explore|search_result)[^\s)\]]*?)[?&]xsec_token=[^\s)\]&]*(&xsec_source=[^\s)\]]*)?',r'\1',txt)
        txt=re.sub(r'^Hi! \S+\s*$','[logged-in account name removed]',txt,flags=re.M)
        txt=re.sub(r'\n{3,}','\n\n',txt)
        name=re.sub(r'\.(html|md|pdf)$','',f)
        name=re.sub(r'\s+[0-9a-f]{32}$','',name).replace('/','_')
        dst=os.path.join(out,branch,name+'.md'); os.makedirs(os.path.dirname(dst),exist_ok=True)
        hdr=['---',f'source_branch: "{branch}"',f'source_file: "{rel[len(branch)+1:]}"',f'extraction: "{method}"']
        for k in ('title','author','date','url'):
            if k in meta: hdr.append(f'{k}: "{str(meta[k]).replace(chr(34),chr(39))}"')
        hdr+=['note: "Machine-extracted text. Dates come from page metadata and must be verified against the original."','---','']
        open(dst,'w').write('\n'.join(hdr)+txt.strip()+'\n')
        res.append(dict(branch=branch,file=rel[len(branch)+1:],corpus=os.path.relpath(dst,out),chars=len(txt),method=method,**meta))
for r in res: print(r['chars'],r['corpus'][:80])
