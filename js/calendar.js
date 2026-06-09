window.QM_CALENDAR=(function(){
const D=window.QM_DATA,U=window.QM_UTILS;
function yearGz(date){let y=date.getFullYear();if(date<new Date(y,1,4,5))y--;return D.SIXTY[U.mod(y-1984,60)]}
function monthIdx(date){const y=date.getFullYear();const b=[new Date(y,1,4),new Date(y,2,6),new Date(y,3,5),new Date(y,4,6),new Date(y,5,6),new Date(y,6,7),new Date(y,7,8),new Date(y,8,8),new Date(y,9,8),new Date(y,10,7),new Date(y,11,7),new Date(y+1,0,6)];if(date<b[0])return 11;for(let i=0;i<b.length-1;i++)if(date>=b[i]&&date<b[i+1])return i;return 10}
function monthGz(date,ygz){const i=monthIdx(date),ys=ygz[0],map={甲:'丙',己:'丙',乙:'戊',庚:'戊',丙:'庚',辛:'庚',丁:'壬',壬:'壬',戊:'甲',癸:'甲'},si=D.STEMS.indexOf(map[ys]);return D.STEMS[U.mod(si+i,10)]+['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'][i]}
function dayGz(date){const anchor=new Date(1900,0,31);const days=Math.floor((new Date(date.getFullYear(),date.getMonth(),date.getDate())-anchor)/86400000);return D.SIXTY[U.mod(40+days,60)]}
function hourBranch(date){const h=date.getHours();if(h===23||h===0)return '子';return D.BRANCHES[Math.floor((h+1)/2)%12]}
function hourGz(date,dgz){const br=hourBranch(date),bi=D.BRANCHES.indexOf(br),ds=dgz[0],map={甲:'甲',己:'甲',乙:'丙',庚:'丙',丙:'戊',辛:'戊',丁:'庚',壬:'庚',戊:'壬',癸:'壬'},si=D.STEMS.indexOf(map[ds]);return D.STEMS[U.mod(si+bi,10)]+br}
function termApprox(date){const y=date.getFullYear();let last={date:new Date(y-1,11,22),name:'冬至'};for(const [m,d,n] of D.TERM_APPROX){const dt=new Date(y,m-1,d);if(date>=dt)last={date:dt,name:n};else break}return last}
function dun(date){const y=date.getFullYear();return date>=new Date(y,5,21)&&date<new Date(y,11,22)?'阴遁':'阳遁'}
function yuan(date,termDate){const days=Math.max(0,Math.floor((date-termDate)/86400000)),idx=Math.floor(days/5);return idx<=0?'上元':idx===1?'中元':'下元'}
function ju(term,y){const arr=D.JU_TABLE[term]||[1,7,4];return y==='上元'?arr[0]:y==='中元'?arr[1]:arr[2]}
function computeCalendar(date){let fromLunar=false,yg,mg,dg,hg;try{if(window.Solar&&Solar.fromDate){const lunar=Solar.fromDate(date).getLunar();yg=lunar.getYearInGanZhi();mg=lunar.getMonthInGanZhi();dg=lunar.getDayInGanZhi();hg=lunar.getTimeInGanZhi?lunar.getTimeInGanZhi():hourGz(date,dg);fromLunar=true}}catch(e){}if(!yg){yg=yearGz(date);mg=monthGz(date,yg);dg=dayGz(date);hg=hourGz(date,dg)}const t=termApprox(date),du=dun(date),yu=yuan(date,t.date),j=ju(t.name,yu);return {yearGz:yg,monthGz:mg,dayGz:dg,hourGz:hg,term:t.name,termDate:t.date,dun:du,yuan:yu,juNumber:j,fromLunar}}
return {computeCalendar,hourBranch,termApprox};
})();
