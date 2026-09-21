export type StudyData = {progress: Record<string,boolean>; courseProgress: Record<string,{best:number;passed:boolean;completedAt?:string}>; productTrainingProgress: Record<string,{best:number;passed:boolean;completedAt?:string}>; notes: Record<string,string>};
export const emptyProgress: StudyData = {progress:{},courseProgress:{},productTrainingProgress:{},notes:{}};
export function validProgress(value: unknown): value is StudyData {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const data=value as Record<string,unknown>;
  if(Object.keys(data).some(k=>!Object.hasOwn(emptyProgress,k)))return false;
  return Object.keys(emptyProgress).every(kind=>{
    const entries=data[kind];
    if(!entries || typeof entries!=='object'||Array.isArray(entries)||Object.keys(entries).length>500)return false;
    return Object.entries(entries).every(([key,v])=>{
      if(!/^[a-z0-9-]{1,100}$/.test(key)||['constructor','prototype','__proto__'].includes(key))return false;
      if(kind==='progress')return typeof v==='boolean';
      if(kind==='notes')return typeof v==='string'&&v.length<=20000;
      if(!v||typeof v!=='object'||Array.isArray(v))return false;
      const r=v as Record<string,unknown>;
      return Object.keys(r).every(k=>['best','passed','completedAt'].includes(k)) && typeof r.best==='number' && Number.isFinite(r.best) && r.best>=0&&r.best<=100&&typeof r.passed==='boolean'&&(r.completedAt===undefined||(typeof r.completedAt==='string'&&r.completedAt.length<=40));
    });
  });
}
