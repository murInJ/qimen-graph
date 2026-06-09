window.QM_DATA=(function(){
const STEMS=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const SIXTY=Array.from({length:60},(_,i)=>STEMS[i%10]+BRANCHES[i%12]);
const STEM_ELEMENT={甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'};
const BRANCH_ELEMENT={子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'};
const ELEMENT_GENERATES={木:'火',火:'土',土:'金',金:'水',水:'木'};
const ELEMENT_CONTROLS={木:'土',土:'水',水:'火',火:'金',金:'木'};
const GRID=[4,9,2,3,5,7,8,1,6];
const RING=[1,8,3,4,9,2,7,6];
const STAR_RING=[1,8,3,4,9,2,7,6,5];
const PALACE_NUMS=[1,2,3,4,5,6,7,8,9];
const PALACES={
1:{num:1,name:'坎一宫',gua:'坎',element:'水',dir:'北',branch:['子']},
2:{num:2,name:'坤二宫',gua:'坤',element:'土',dir:'西南',branch:['未','申']},
3:{num:3,name:'震三宫',gua:'震',element:'木',dir:'东',branch:['卯']},
4:{num:4,name:'巽四宫',gua:'巽',element:'木',dir:'东南',branch:['辰','巳']},
5:{num:5,name:'中五宫',gua:'中',element:'土',dir:'中',branch:[]},
6:{num:6,name:'乾六宫',gua:'乾',element:'金',dir:'西北',branch:['戌','亥']},
7:{num:7,name:'兑七宫',gua:'兑',element:'金',dir:'西',branch:['酉']},
8:{num:8,name:'艮八宫',gua:'艮',element:'土',dir:'东北',branch:['丑','寅']},
9:{num:9,name:'离九宫',gua:'离',element:'火',dir:'南',branch:['午']}
};
const BASE_DOORS={
1:{name:'休门',element:'水',nature:'吉',desc:'休养、调和、贵人、缓和'},8:{name:'生门',element:'土',nature:'吉',desc:'生机、收益、增长、资源'},3:{name:'伤门',element:'木',nature:'凶',desc:'损伤、冲动、竞争、破耗'},4:{name:'杜门',element:'木',nature:'平',desc:'阻隔、保密、技术、封闭'},9:{name:'景门',element:'火',nature:'平',desc:'文书、曝光、名声、虚象'},2:{name:'死门',element:'土',nature:'凶',desc:'停滞、病厄、终结、压力'},7:{name:'惊门',element:'金',nature:'凶',desc:'惊扰、口舌、消息、风险'},6:{name:'开门',element:'金',nature:'吉',desc:'开启、事业、机会、执行'}};
const BASE_STARS={
1:{name:'天蓬',element:'水',nature:'凶',desc:'胆略、风险、欲望、暗流'},8:{name:'天任',element:'土',nature:'吉',desc:'承载、责任、稳定、守成'},3:{name:'天冲',element:'木',nature:'平',desc:'行动、冲击、突破、急进'},4:{name:'天辅',element:'木',nature:'吉',desc:'文教、辅助、方案、贵人'},9:{name:'天英',element:'火',nature:'平',desc:'名声、显现、文采、热度'},2:{name:'天芮',element:'土',nature:'凶',desc:'病符、问题、负担、学习'},7:{name:'天柱',element:'金',nature:'凶',desc:'阻力、破坏、口舌、制度'},6:{name:'天心',element:'金',nature:'吉',desc:'医药、策略、核心、领导'},5:{name:'天禽',element:'土',nature:'吉',desc:'中枢、整合、权衡、统摄'}};
const GOD_ORDER=['值符','螣蛇','太阴','六合','白虎','玄武','九地','九天'];
const GOD_META={值符:{nature:'吉',desc:'主控、权柄、核心、贵人'},螣蛇:{nature:'凶',desc:'虚惊、缠绕、疑虑、变化'},太阴:{nature:'吉',desc:'暗助、谋划、柔和、隐藏资源'},六合:{nature:'吉',desc:'合作、关系、协调、契约'},白虎:{nature:'凶',desc:'冲突、伤灾、强压、执行风险'},玄武:{nature:'凶',desc:'隐瞒、欺诈、暧昧、暗耗'},九地:{nature:'平',desc:'稳定、潜伏、迟缓、根基'},九天:{nature:'吉',desc:'高举、远行、扩张、突破'}};
const HIDDEN_JIA=[{start:'甲子',hidden:'戊',voids:['戌','亥']},{start:'甲戌',hidden:'己',voids:['申','酉']},{start:'甲申',hidden:'庚',voids:['午','未']},{start:'甲午',hidden:'辛',voids:['辰','巳']},{start:'甲辰',hidden:'壬',voids:['寅','卯']},{start:'甲寅',hidden:'癸',voids:['子','丑']}];
const TERM_APPROX=[[1,6,'小寒'],[1,20,'大寒'],[2,4,'立春'],[2,19,'雨水'],[3,6,'惊蛰'],[3,21,'春分'],[4,5,'清明'],[4,20,'谷雨'],[5,6,'立夏'],[5,21,'小满'],[6,6,'芒种'],[6,21,'夏至'],[7,7,'小暑'],[7,23,'大暑'],[8,8,'立秋'],[8,23,'处暑'],[9,8,'白露'],[9,23,'秋分'],[10,8,'寒露'],[10,23,'霜降'],[11,7,'立冬'],[11,22,'小雪'],[12,7,'大雪'],[12,22,'冬至']];
const JU_TABLE={冬至:[1,7,4],小寒:[2,8,5],大寒:[3,9,6],立春:[8,5,2],雨水:[9,6,3],惊蛰:[1,7,4],春分:[3,9,6],清明:[4,1,7],谷雨:[5,2,8],立夏:[4,1,7],小满:[5,2,8],芒种:[6,3,9],夏至:[9,3,6],小暑:[8,2,5],大暑:[7,1,4],立秋:[2,5,8],处暑:[1,4,7],白露:[9,3,6],秋分:[7,1,4],寒露:[6,9,3],霜降:[5,8,2],立冬:[6,9,3],小雪:[5,8,2],大雪:[4,7,1]};
const TOPIC_CONFIG={general:{name:'综合问事',note:'先看日干为我、时干为事或对方，兼看值符值使主控与执行。'},wealth:{name:'求财合作',note:'重点看生门、日干、时干、值符及其宫间生克。'},career:{name:'事业项目',note:'重点看开门、值使、日干、时干，以及落宫是否空亡受制。'},love:{name:'感情关系',note:'常以乙庚、六合、休门、日时干看关系、态度与互动。'},health:{name:'健康疾病',note:'重点看天芮、死门、病宫、日干及空亡入墓受制。'},travel:{name:'出行行动',note:'重点看马星、开门、时干及目标方位宫的落地程度。'},exam:{name:'考试文书',note:'重点看景门、天辅、丁奇、日干及文书宫状态。'}};
return {STEMS,BRANCHES,SIXTY,STEM_ELEMENT,BRANCH_ELEMENT,ELEMENT_GENERATES,ELEMENT_CONTROLS,GRID,RING,STAR_RING,PALACE_NUMS,PALACES,BASE_DOORS,BASE_STARS,GOD_ORDER,GOD_META,HIDDEN_JIA,TERM_APPROX,JU_TABLE,TOPIC_CONFIG};
})();
