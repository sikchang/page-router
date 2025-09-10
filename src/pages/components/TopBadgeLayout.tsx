function TopBadgeLayout({ children }:{ children:React.ReactNode }) {
  return (
    <div>
      <p
        className='bg-sky-800 text-center m-2 rounded py-2'
      >탑 레벨 뱃지 레이아웃</p>
      {children}
    </div>
  )
}
export default TopBadgeLayout
