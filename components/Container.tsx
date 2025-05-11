"use client";

interface ContainerPros {
    children: React.ReactNode,
}

const Container = ({
    children,
}: ContainerPros) => {
  return (
    <div className="mx-1 sm:mx-6 md:mx-10 lg:mx-14 xl:mx-16 2xl:mx-auto max-w-[1400px]">
        {children}
    </div>
  )
}

export default Container