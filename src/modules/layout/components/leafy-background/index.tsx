import Image from 'next/image'

type Props = {}

const LeafyBackground = (props: Props) => {
  return (
    <div className='w-screen overflow-hidden z-[-999]'>
      {/* Background decorative elements */}
      <div className="absolute -top-10 -left-40 md:top-[50vh] md:-left-20 opacity-20 z-[-9999]">
        <Image
          src="/palm1.png"
          alt=""
          width={800}
          height={800}
          className="object-contain w-[500px] h-[500px] blur-[8px] md:w-[30vw] md:h-[30vw] md:blur-md"
        />
      </div>
      <div className="absolute -bottom-10 -right-40 md:-bottom-[20vh]  md:-right-[20vw] opacity-[0.4] z-[-9999]">
        <Image
          src="/palm2.png"
          alt=""
          width={1000}
          height={1000}
          className="object-contain w-[1000px] h-[1000px] md:w-[70vw] md:h-[70vw] blur-[8px] md:blur-md"
        />
      </div>


      {/* Bottom wave decoration */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent"></div> */}
    </div>
  )
}

export default LeafyBackground
