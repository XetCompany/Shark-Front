export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};

export function formatCustomDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}
