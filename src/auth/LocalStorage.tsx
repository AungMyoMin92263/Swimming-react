export const setItem = (lkey: string, lvalue: string) => {
  return localStorage.setItem(lkey, lvalue);
};

export const getItem = (lkey: string) => {
  return localStorage.getItem(lkey);
};

export const removeItem = (lkey: string) => {
  if(lkey == 'authUser'){
    localStorage.removeItem('userToken');
  }
  return localStorage.removeItem(lkey);
};

export const clearItem = () => {
  return localStorage.clear();
};

export const setItemWithObject = (lkey: string, lvalue: object) => {
  localStorage.setItem(lkey, JSON.stringify(lvalue));
};

export const setArrayWithObject = (lkey: string, lvalue: object) =>{
  const previousItems = JSON.parse(getItem(lkey) || "null");
  const newsItems = [previousItems, { lvalue }];
  localStorage.setItem(lkey, JSON.stringify(newsItems));
}


export const getItemObject = (lkey: string) => {
	return localStorage.getItem(lkey);
};
