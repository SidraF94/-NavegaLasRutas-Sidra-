
export const generateSlug = (titulo) => {
  return titulo
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') 
    .replace(/\s+/g, '-') 
    .replace(/-+/g, '-') 
    .trim('-'); 
};


export const generateSlugWithId = (titulo, id) => {
  const slug = generateSlug(titulo);
  return slug ? `${slug}-${id}` : `emoji-${id}`;
};


