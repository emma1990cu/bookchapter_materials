import sys, os, subprocess, glob
from PIL import Image, ImageChops, ImageStat, ImageDraw
vid, out, y0, y1, step = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]), sys.argv[5]
d = out + '_f'; os.makedirs(d, exist_ok=True)
for f in glob.glob(d+'/*.png'): os.remove(f)
subprocess.run(['ffmpeg','-v','error','-i',vid,'-vf',f'fps=1/{step}','-q:v','2',d+'/%04d.png'],check=True)
fr = sorted(glob.glob(d+'/*.png')); keep=[]; prev=None
for i,f in enumerate(fr):
    im=Image.open(f); W,H=im.size; c=im.crop((0,int(H*y0),W,int(H*y1))).convert('L').resize((480,int(480*(y1-y0)*H/W)))
    if prev is None or ImageStat.Stat(ImageChops.difference(c,prev)).mean[0]>6: keep.append((i*float(step),c)); prev=c
w,h=keep[0][1].size; cols=2; rows=(len(keep)+cols-1)//cols
T=Image.new('L',(cols*(w+60),rows*(h+4)),255); dr=ImageDraw.Draw(T)
for k,(t,c) in enumerate(keep):
    x=(k%cols)*(w+60); y=(k//cols)*(h+4); dr.text((x+2,y+h//3),f'{int(t//60)}:{int(t%60):02d}',fill=0); T.paste(c,(x+58,y))
T.save(out); print(len(fr),'frames ->',len(keep),'kept', T.size)
