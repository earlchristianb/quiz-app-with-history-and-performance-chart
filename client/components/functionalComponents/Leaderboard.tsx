import Image from "next/image"
import { FC } from "react"
import ranking from '../../public/top-three.png';
const Leaderboard :FC= () => {
  return (
      <div className="absolute bottom-2 right-2  flex flex-col justify-center items-center bg-secondaryDark rounded-lg p-2  w-16 md:w-24 shadow-lg hover:cursor-pointer">
          <div className="relative h-6 w-6"><Image src={ranking} layout="fill" alt="nn" /></div>
          <p className="text-xs font-semibold">Ranking</p>
    </div>
  )
}

export default Leaderboard