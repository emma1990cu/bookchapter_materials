# "追星星的AI"的产品与技术文件：其中对孤独症儿童的预设

> 方法与可信度说明（请先读）
> - 本会话网络受限：arxiv.org、aclanthology.org、modelscope.cn、mp.weixin.qq.com、alibaba.com、各新闻站点均**无法直接抓取**（DNS 被拦截），只有 GitHub 可以访问。
> - 因此：(a) **代码仓库**的内容是我亲手 clone 并逐字阅读的，引文是逐字原文（X-PLUG/MM_StoryAgent，最新提交 e480648，2024-08-23）；(b) **论文与新闻报道**的内容只能来自 WebSearch 的摘要片段。这些片段是检索工具改写过的，**不是逐字原文**。下文凡标"（检索摘要）"的，写入正文前都应打开原 URL 核对。
> - 下文"引号内中文"如出自新闻，只是检索摘要里转述的报道用语，不保证与原文逐字一致。

## 问题 1：MM-StoryAgent 论文（arXiv 2503.05242；据称发表于 NAACL 2025）

### 结论
现有资料**没有任何证据**表明 MM-StoryAgent 论文或其代码提到孤独症或特殊需要儿童。它的定位是通用的"儿童睡前故事/有声绘本视频"生成框架。故事质量由 **GPT-4 按评分细则自动打分**，另有一次规模不明的人工评测。没有任何迹象表明孤独症儿童或其家长参与了评估。

### 引用的发现
- 标题："MM-StoryAgent: Immersive Narrated Storybook Video Generation with a Multi-Agent Paradigm across Text, Image and Audio"。arXiv:2503.05242，2025-03-07 提交，cs.CL；作者 Xuenan Xu、Jiahao Mei 等共 8 人。—— [arXiv](https://arxiv.org/abs/2503.05242)；[检索摘要](https://arxiv.org/pdf/2503.05242)（未能直接打开，完整作者名单与单位未核实）
- 摘要的问题框架（检索摘要）：要解决的挑战是提升 "story attractiveness"、丰富 "storytelling expressiveness"，并提供开源评测基准；自称是 "first open-source framework for narrated storybook video generation"。—— [arXiv](https://arxiv.org/abs/2503.05242)
- 针对 "MM-StoryAgent" + autism 的检索没有找到二者的任何关联；检索工具的结论是："None of the results say MM-StoryAgent was designed for, tested on, or evaluated with autistic children."（检索摘要）—— [arXiv](https://arxiv.org/abs/2503.05242)；[Moonlight 文献综述](https://www.themoonlight.io/en/review/mm-storyagent-immersive-narrated-storybook-video-generation-with-a-multi-agent-paradigm-across-text-image-and-audio)
- 评估方法（第三方摘要，非论文原文）：文本质量由 GPT-4 按 attractiveness / warmth / educational value 三个维度打分；图文对齐用 CLIP，音频对齐用 CLAP；基准为 4 个领域共 100 个故事主题。据称人工评测者更偏好 MM-StoryAgent 的 "warmth" 和图文对齐。—— [Lacuna 摘要](https://lacuna.tiptreesystems.com/work/mm-storyagent-immersive-narrated-storybook-video-generation)；[alphaXiv](https://www.alphaxiv.org/abs/2503.05242)
- 自述的局限（检索摘要）：短时音效与旁白的对齐仍有问题；文生图等工具的效果是限制最终视频质量的关键因素。—— [检索摘要 / arXiv](https://arxiv.org/pdf/2503.05242)
- NAACL 2025 收录：我在检索结果中**未能**确认 ACL Anthology 上有该文条目。—— [NAACL 2025 长文卷目录](https://aclanthology.org/volumes/2025.naacl-long/)（无法打开核对）

### 推断
- 论文的评价体系把"好故事"定义为 attractiveness / warmth / education，并由 GPT-4 充当评审。也就是说，所谓"适合儿童"的标准是由一个通用大模型对**泛化的"children"**作出的判断，而非由孤独症儿童、家长或特教专业人员判断。论文这一层没有为孤独症单独设置评价维度。
- 产品宣传中针对孤独症的设计（"简洁画面""文字平实直白""三级认知水平""四类内容"）在开源论文与代码里**找不到对应实现**。这些很可能是通义 App 产品层的闭源 prompt 与微调，见问题 2。

### 缺口
- 未能读到论文全文：完整作者与单位（推测为阿里通义实验室 / 上海交大等，**未核实**）、人工评测人数与招募方式、是否在任何位置提及"追星星的AI"或孤独症应用场景。需开放 arxiv.org / aclanthology.org 后核对。

## 问题 2：开源代码（README、prompt 模板、类别、风格约束）

### 结论
已公开的 X-PLUG/MM_StoryAgent 仓库是一个**通用英文儿童睡前故事**流水线。全仓库检索 autis / 自闭 / special / disab 均为零命中。仓库里既没有"常识认知、社交礼仪、心智解读、趣味故事"四类内容，也没有"三级认知水平"或"需要避免的内容"。产品层面的孤独症适配（前后端与 prompt）**未开源**，官方当时只承诺"未来进一步开源"。不过，通用 prompt 中已经嵌入了一套规范性的儿童观：教育意义 + 正确价值观 + 温暖愉悦 + 无对话、简洁。

### 引用的发现（逐字摘自仓库，2024-08-23 版）
- 仓库 README："MM-StoryAgent is a multi-agent framework that employs LLMs and diverse expert tools across several modalities to produce expressive storytelling videos." 初版发布日期："Aug 16, 2024: The initial version of MM-StoryAgent was released." —— [GitHub README](https://github.com/X-PLUG/MM_StoryAgent)
- README 关于评估："We use GPT-4 to automatically evaluate the story quality according to several aspects. Our story writing agent is compared with directly prompting LLM to write stories." 评测表维度为 Attractiveness / Warmth / Education，总平均分 Story Agent 4.65，Direct 4.47。—— [GitHub README](https://github.com/X-PLUG/MM_StoryAgent)
- 故事写作的核心指令 `instruction`（mm_story_agent/prompts_en.py）逐字如下：
  > "1. Conciseness: Describe the plot of each chapter in a simple and straightforward manner, using a storybook tone without excessive details.
  > 2. Narrative Style: There is no need for dialogue or interaction with the reader.
  > 3. Coherent Plot: ...
  > 4. Reasonableness: The plot should make sense, avoiding logical errors and unreasonable elements.
  > 5. Educational Value: A good bedtime story should have educational significance, helping children learn proper values and behaviors.
  > 6. Warm and Pleasant: The story should evoke a sense of ease, warmth, and joy, making children feel loved and cared for."
  —— [prompts_en.py](https://github.com/X-PLUG/MM_StoryAgent/blob/main/mm_story_agent/prompts_en.py)
- "学生–专家"对话式构思，question_asker_system 逐字："You are a student learning to write children stories, discussing writing ideas with an expert." expert_system 逐字："You are an expert in children story writing." —— [prompts_en.py](https://github.com/X-PLUG/MM_StoryAgent/blob/main/mm_story_agent/prompts_en.py)
- 篇幅约束，chapter_writer_system 逐字："The expanded content should not be too lengthy, with a maximum of 3 pages and no more than 2 sentences per page." —— 同上
- 角色描述只允许外貌，并要求标明性别或物种，role_review_system 逐字："Descriptions must be **brief**, **visual** descriptions that indicate gender or species, such as "little boy" or "bird"." 以及 "Descriptions should not include any information beyond appearance, such as personality or behavior." —— 同上
- 画面描述的简化原则，story_to_image_reviser_system 逐字："1. Keep it concise. Focus on the main visual elements, omit details. 2. Retain visual elements. Only describe static scenes, avoid the plot details. 3. Remove non-visual elements. Typical non-visual elements include dialogue, thoughts, and plot." —— 同上
- 图像风格：默认 style "Storybook" = "Cartoon style, cute illustration of {prompt}."，负面提示词包括 "realism, photo, realistic ... grayscale, noisy, sloppy, messy, grainy, ultra textured"。通用负面词逐字："naked, deformed, bad anatomy, disfigured, poorly drawn face, mutation, extra limb, ugly, disgusting, poorly drawn hands, missing limb, floating limbs, disconnected limbs, blurry, watermarks, oversaturated, distorted hands, amputation"。—— [image_agent.py](https://github.com/X-PLUG/MM_StoryAgent/blob/main/mm_story_agent/modality_agents/image_agent.py)
- 评测题库 story_eval/story_topics.json 有 4 类、每类 25 题：'self growing'、'family and friendship'、'natural and social environments'、'knowledge learning'。示例题目逐字："Understanding Boundaries: How a child learns about personal space and setting limits."；"Coping with Stress: Techniques a child uses to manage stress and anxiety."；"Learning Self-Discipline: A tale of how a child learns the importance of self-control."；默认配置主题为 "Time Management: A child learning how to manage their time effectively." —— [story_topics.json](https://github.com/X-PLUG/MM_StoryAgent/blob/main/story_eval/story_topics.json)；[configs/mm_story_agent.yaml](https://github.com/X-PLUG/MM_StoryAgent/blob/main/configs/mm_story_agent.yaml)
- 评分细则 rubric_5.json 逐字：教育维度 5 分 = "Extremely educational; the entire text is filled with profound and comprehensive educational content that has a far-reaching and positive impact on children's growth."；兴趣维度 = "How engaging and appealing is the story to children?"；评测 prompt 注明 "borrrowed from STORM (stanford-oval/storm ... eval_prometheus_no_ref.prompt)"。—— [rubric_5.json](https://github.com/X-PLUG/MM_StoryAgent/blob/main/story_eval/rubric_5.json)；[eval_prompts.py](https://github.com/X-PLUG/MM_StoryAgent/blob/main/story_eval/eval_prompts.py)
- 语音默认使用 CosyVoice 的 "longyuan" 音色，图像用 StoryDiffusion + SDXL，音乐用 MusicGen，音效用 AudioLDM2 / Freesound。—— [configs/mm_story_agent.yaml](https://github.com/X-PLUG/MM_StoryAgent/blob/main/configs/mm_story_agent.yaml)
- 全仓库对 "autis|自闭|special|disab" 检索零命中（本人 grep 结果，基于提交 e480648）。仓库只有英文 prompt 文件 prompts_en.py，没有中文 prompt。
- GitHub 上检索"追星星"未发现阿里官方的"追星星的AI"仓库（共 271 条结果，均无关）。—— [GitHub 检索](https://github.com/search?q=%E8%BF%BD%E6%98%9F%E6%98%9F&type=repositories)
- 官方开源口径（检索摘要）："阿里巴巴已在'魔搭'社区免费开源 ModelScope-Agent 框架及其配套能力，未来其前后端界面将进一步开源。" —— [华夏时报](https://m.chinatimes.net.cn/article/144013.html)；[阿里巴巴集团官网稿](https://ali-home.alibaba.com/document-1752414890598858752)（无法打开）

### 推断
- 开源层面对"儿童"的预设是：需要被教育（"proper values and behaviors"、"self-control"、"boundaries"），需要被温暖保护（"feel loved and cared for"），叙事上无对话、无与读者的互动，画面卡通、可爱、去除"messy""ultra textured"。这与产品宣传中针对孤独症的"画面简洁、人物突出、文字平实直接"高度同构。可以说，孤独症适配很可能是在一个**本已是"规训 + 温情"导向的通用儿童故事模板**之上，再加一层简化。
- 角色描述被强制写成 "little boy"/"bird" 这类性别或物种标签，并禁止写入 personality / behavior。性别二元标签也呼应了产品中"设置主角性别"这一选项。
- 宣传中所说的"开源"，实际只开源了通用框架，孤独症专属的类别、认知分级、避免内容等设计**无法从公开代码中审视**。这本身是一个可以写入正文的发现：专业知识被封装在闭源产品层。

### 缺口
- ModelScope 上的 ModelScope-Agent 仓库，以及是否存在"追星星的AI"创空间（studio），因 modelscope.cn 无法访问而未核实；github.com/modelscope/modelscope-agent 本次未 clone 检查。
- 四类内容、三级认知水平和"需避免内容"的实际 prompt 文本：**未找到公开版本**。
- 由于 gh API 权限受限，无法列出该仓库的 issues 与完整提交历史。

## 问题 3：阿里官方及合作方资料（设计理由、调研、专家、合作机构、数据、后续发展）

### 结论
官方口径的核心叙事是："志愿者（含星宝爸爸）+ 干预专家指导微调 + 100 户家庭调研"。设计理由是"针对孤独症儿童的认知特点"追求画面简洁、人物突出、语言直白。功能上设有四类内容、三级认知水平、可设"需要避免的内容"和"主角性别"。后续：2025-09 发布 2.0（家长声音复刻、故事广场、邀约注册制）；2025-12 登陆千问 APP；2026-07 举办首届"星光公益绘本节"；2026-09 余杭"AI绘星河"活动，项目获浙江省志愿服务金奖。服务人数各来源口径不一（"20万人次"与"两万多家庭"并存）。

### 引用的发现
**发布（2024-07，WAIC）**
- 联合发布方：阿里巴巴与上海美术电影制片厂、"阅读中国"基金，以及孤独症干预机构恒星乐乐、海豚乐乐；自称"国内首个"孤独症儿童 AI 绘本工具。虎嗅注明"首个"是阿里方面的表述。（检索摘要）—— [新浪财经/环球网](https://finance.sina.com.cn/jjxw/2024-07-05/doc-inccanui4150184.shtml)；[虎嗅](https://www.huxiu.com/brief/167501.html)；[余杭区政府网](http://www.yuhang.gov.cn/art/2024/7/8/art_1532131_59102084.html)
- 功能（检索摘要）：家长输入一句故事梗概，并可"设置篇幅、主角性别和需要避免的内容"，即可生成图文并茂、可自动朗读的绘本；"可以生成常识认知、社交礼仪、心智解读、趣味故事4类内容，并可设置3个层级的认知水平"。入口在通义 App 的"频道"页。—— [经济观察网](http://www.eeo.com.cn/2024/0705/670660.shtml)；[搜狐](https://www.sohu.com/a/791071270_121627717)；[三易生活](https://www.3elife.net/Art/internet/202407/07/95044.html)
- 设计理由（检索摘要）："针对孤独症儿童的认知特点，画面更简洁、人物更突出、文字平实直接"；"与一般AIGC产品不同，它追求画面简洁、人物突出，而非构图复杂"；支持用户自定义修改故事文本。—— [搜狐](https://www.sohu.com/a/791071270_121627717)；[华夏时报](https://m.chinatimes.net.cn/article/144013.html)；[三易生活](https://www.3elife.net/Art/internet/202407/07/95044.html)
- 技术（检索摘要）："基于阿里自研ModelScope-Agent框架"，"利用角色扮演能力打造故事绘本专家角色"，并调用文生图、语音合成等能力；"在孤独症儿童干预专家的指导下，对AI模型进行了针对性的微调优化"；生图模型后来更新为通义万相 2.1（Wan2.1），据称"故事表达能力更强"。—— [华夏时报《微光力量》](https://m.chinatimes.net.cn/article/144013.html)；[网易《微光力量》](https://m.163.com/dy/article/JRMGP0SJ0512D03F.html)；[智东西](https://zhidx.com/news/42239.html)
- 开发过程（检索摘要）：近 20 名志愿者线上协作，历时 2 个月开发完成；志愿者褚韩龙是一位星宝爸爸，提出了许多具体需求；产品 6 月 15 日上线，后获苹果应用市场精选推荐。—— [网易《微光力量》](https://m.163.com/dy/article/JRMGP0SJ0512D03F.html)；[腾讯新闻（阿里志愿者打造AI工具）](https://news.qq.com/rain/a/20240705A069JR00)
- 100 户调研（检索摘要）：产品上线前，技术团队"对100个孤独症儿童家庭进行调研，了解孤独症儿童对AI定制绘本的具体需求"，之后在干预专家指导下微调模型。家长提到的需求示例包括孩子"害怕洗头、不会表达情绪，或者不理解为什么要排队"。—— [网易《微光力量》](https://m.163.com/dy/article/JRMGP0SJ0512D03F.html)；[中国日报](https://caijing.chinadaily.com.cn/a/202407/06/WS6688a802a3107cd55d26a2b7.html)
- 上美影授权孙悟空、大耳朵图图等经典形象作为故事主角模板（部分报道称专题模板"限时上线"）。—— [虎嗅](https://www.huxiu.com/brief/167501.html)；[新浪财经](https://finance.sina.com.cn/tech/2024-07-05/doc-inccanun1984007.shtml)；[新华网](http://www.news.cn/tech/20240705/3c53c27b45024cf6ba38a7cecb4379fd/c.html)
- 背景数据：报道称我国 0–14 岁孤独症儿童约 200 万。—— [搜狐](https://www.sohu.com/a/791071270_121627717)；[腾讯新闻·潮看浙江](https://news.qq.com/rain/a/20241114A05E3D00)

**专家**
- 浙江工业大学王永固教授"投身特殊教育信息化事业多年"，担任项目专家顾问；检索未发现报道称他主导了 100 户调研。（检索摘要）—— [腾讯新闻·潮看浙江（2024-11-14）](https://news.qq.com/rain/a/20241114A05E3D00)

**迭代与规模**
- 魔搭社区招募帖《温暖接力："追星星的AI"再出发，志愿者招募令！》（检索摘要）：服务"近20万人次的孤独症家庭及特教老师"，计划新版本引入父母、亲人的声音录制，"以激发星宝的好奇心和参与感"。—— [魔搭社区](https://community.modelscope.cn/6764d43461f6a61b945a2582.html)（无法打开）
- 2025-09-25 云栖大会发布 2.0 版本（检索摘要）："文图模型全面升级"，新增家长声音复刻、故事广场；升级后改为"邀约注册制"，需通过公众号获取邀请码。另据报道，项目 2024 年 4 月成立，是志愿者业余公益项目，现有 40 多人的产品技术团队。—— [中国头条（2025-09-26）](https://www.zhongguotoutiao.com/content/20250926/82473.shtml)；[新浪财经](https://cj.sina.com.cn/articles/view/2822771827/a84014730200163bo)
- 2025-12，2.0 版本登陆千问 APP，报道称"服务超过20万人次"。（检索摘要）—— [中国日报区域频道（2026-07-23）](https://regional.chinadaily.com.cn/cn/2026-07/23/c_1199740.htm)；[新浪财经](https://finance.sina.com.cn/jjxw/2026-07-23/doc-iniiuwsw8209978.shtml)
- 2026-07-23 首届"星光公益绘本节"（检索摘要）：邀请公众用约 5 分钟，为一位**真实的**孤独症儿童创作专属绘本；在官网选择一个"星宝"的需求来"点亮一颗星"，并可授权自己的声音朗读。中国精神残疾人及亲友协会提供专业指导，脱不花、六神磊磊、馒头大师等名人作为首批"星光绘梦人"参与。截至 2026 年 3 月已覆盖"两万多个孤独症儿童家庭及特教老师"。项目与南京特殊教育师范学院合作推出"5个系列62本专业绘本"，并支持儿童档案管理、家长声音克隆。—— [中国日报区域频道](https://regional.chinadaily.com.cn/cn/2026-07/23/c_1199740.htm)；[新浪财经](https://finance.sina.com.cn/jjxw/2026-07-23/doc-iniiuwsw8209978.shtml)
- 2026-09-04 余杭"AI绘星河·融爱伴成长"活动（检索摘要）：由余杭区委社会工作部、余杭区残联、阿里巴巴联合主办，在余杭融爱中心举行；探索"学校共读、家庭干预、机构康复、社区互动"四维融合模式；项目获"2025年浙江省志愿服务项目大赛金奖"。工具被描述为"根据孩子的认知特点、兴趣偏好和成长目标，自动生成定制化绘本"。—— [腾讯新闻（2026-09-05）](https://news.qq.com/rain/a/20260905A073O000)
- 2026-09-10 教师节视频报道（检索摘要）："孤独症无法治愈，但成长可以被温柔回应"；"把老师从繁琐教具制作中解放出来，把时间还给陪伴，AI 不能替代爱，但能让爱更有方向"。—— [腾讯新闻视频](https://news.qq.com/rain/a/20260910V07QLB00)
- 相关的杭州语境：2024 年报道《"星星的孩子"教AI认识世界》讲的是杭州杨绫子学校孤独症实验班开设数据标注专业。这与"追星星的AI"无直接关系，但可以作为同一城市"AI+孤独症"话语的对照。—— [杭州市政府网](https://www.hangzhou.gov.cn/art/2024/4/2/art_812270_59095414.html)；[腾讯新闻（2026-09-14）](https://news.qq.com/rain/a/20260914A0CCYH00)

### 推断
- 设计理由中反复出现的"认知特点"话语（简洁、直白、分级）把孤独症儿童建构为**认知能力需要降维适配的对象**。四类内容中有"社交礼仪""心智解读"，对应的是"心智理论缺陷"、需要学习社会规范的缺陷模型。"需要避免的内容"则把家长设为把关者。
- 表述上的位移值得注意：从 2024 年"家长为自己孩子定制"，到 2026 年"公众为真实星宝点亮一颗星"。孤独症儿童由**用户**转变为**公益受助对象和情感动员的媒介**，名人参与、"5分钟"的低门槛都强化了慈善式的观看位置。
- 服务数据存在口径冲突："近/超 20 万人次"（魔搭招募帖、2025-12）与"两万多个家庭及特教老师"（截至 2026-03）。前者是人次，后者是户或人，不应混用。

### 缺口
- 100 户调研的问卷内容、样本构成、结果报告：**未找到公开版本**。
- 恒星乐乐、海豚乐乐和王永固团队具体如何参与微调，未见技术文档。
- "中国青少年发展基金会"的参与：本次检索**未找到**相关证据。
- 小程序形态、2026 年获奖之外的其他奖项：未查到。
- 阿里集团官网原稿（ali-home.alibaba.com）、阿里公益公众号、魔搭帖子正文均无法打开，引文未逐字核对。

## 问题 4：批评性或独立评论

### 结论
直接针对"追星星的AI"的独立批评很少，主要有：一篇评论质疑"技术与关怀能否真的融合"；媒体报道中家长的保留态度；有从业者以神经多样性话语谈干预。**未找到**孤独症自我倡导者或残障权益团体对该工具的公开评论。

### 引用的发现
- 达摩AI网评论《推出孤独症儿童的AI绘本工具，技术与关怀能否真的融合？》（检索摘要）：指出 AI 在理解和适应孤独症儿童复杂需求方面"可能存在很大的局限性"，提到审核环节耗时较长，并担心公益项目结束后工具难以持续迭代。—— [damoai.com.cn](http://www.damoai.com.cn/archives/6377)
- 《一群追星星的人，对AI的盼与怕》（WAIC 2024 现场报道，检索摘要）：发起人之一是星宝父亲，孩子图图每晚要听故事入睡，但市面上很难找到符合其兴趣的绘本；照护者"每天绞尽脑汁地给孩子编故事"。文章称 AI 的利弊"需要引导"。—— [搜狐](https://m.sohu.com/a/793470068_99997500)；[电子工程专辑](https://www.eet-china.com/mp/a331170.html)
- 《南方日报》2025-04-02《当AI闯入"孤独星球"》（检索摘要）：家长张之光"并不确定，AI究竟能帮助孤独症孩子走到哪一步"。—— [南方日报](https://epaper.nfnews.com/m/ipaper/nfrb/html/202504/02/content_10131503.html)
- 康复行业用 AI 绘本作为教具以降低成本（检索摘要），但效果缺乏公开的科学验证；有机构人士称孤独症"其实不是病，只是神经多样性"。—— [腾讯新闻《用AI降低自闭症康复成本》（2025-01-05）](https://news.qq.com/rain/a/20250105A03JR200)
- 关于 AI 绘本的一般性质疑（非孤独症专属）：内容平庸、画面比例失调等。—— [人民网上海](http://sh.people.com.cn/n2/2024/0913/c350122-40977191.html)；[创业邦](https://m.cyzone.cn/article/814192)

### 推断
- 公开话语几乎完全由阿里、合作方和地方政府的宣传稿主导，独立评估（包括效果研究、孤独症当事人的声音）缺席。这本身就是"社会想象"分析的重要材料。

### 缺口
- 中文孤独症自我倡导社群（如豆瓣、微博上的自闭者社群）对该产品的评论：本次检索未找到，可能需要人工在社交平台检索。
- 关于该工具的同行评议效果研究：未找到。
