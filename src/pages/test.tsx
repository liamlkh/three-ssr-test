import { useCallback, useMemo, useState } from 'react'

const getAbsoluteURL = (path: string) => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000${path}`
  }
  return `https://${process.env.VERCEL_URL}${path}`
}

export default function Test() {
  const [rot, setRot] = useState(0);

  const updateRot = useCallback((value: 1 | -1) => {
    setRot(rot + value * 5);
  }, [rot])

  const src = useMemo(() => {
    return getAbsoluteURL(`/api/render?rot=${rot}`);
  }, [rot]);

  return (
    <>
      <img src={src}/>
      <button onClick={() => updateRot(-1)}>←</button>
      <button onClick={() => updateRot(1)}>→</button>
    </>
  )
}
