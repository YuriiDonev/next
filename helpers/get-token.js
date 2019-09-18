
export const getToken = (req) => {
  let token;
  if (req) {
    if (req.headers && req.headers.cookie) {
      const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('portfolio-token='));
      if (cookie) {
        token = cookie.split('=')[1];
      }
    }
  } else {
    token = localStorage.getItem('portfolio-token');
  }
  return token;
}
