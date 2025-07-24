export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password }),
  });
  if (!res.ok) throw new Error('로그인 실패');
  return res.json();
}
