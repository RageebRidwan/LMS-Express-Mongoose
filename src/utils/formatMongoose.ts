const formatDoc = (doc: any) => {
  const { _id, ...rest } = doc.toObject();
  return { _id, ...rest };
};
const formatDocs = (docs: any[]) => {
  return docs.map((doc) => formatDoc(doc));
};
export { formatDoc, formatDocs };
