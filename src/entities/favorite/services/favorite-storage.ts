const STORAGE_KEY="favorites";


export const loadFavorites = () => {

 try{

  const data =
   localStorage.getItem(STORAGE_KEY);

  return data
   ? JSON.parse(data)
   : {};

 }catch{

  return {};

 }

};



export const saveFavorites = (
 data:any
)=>{

 localStorage.setItem(
  STORAGE_KEY,
  JSON.stringify(data)
 );

};