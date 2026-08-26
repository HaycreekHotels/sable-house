import Image from "next/image";
import Link from "next/link";

const placeHolder =
  "https://images.unsplash.com/photo-1623184185917-d2e8ec0daa27?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function FullWidth() {
  return (
    <section className="">
      <div className="relative w-full min-h-[90vh] overflow-hidden">
        <Image
          src={placeHolder}
          alt="Flourishing green forest in Savannah, Georgia"
          fill
          className="object-cover"
        />
        <div className="absolute grid grid-cols-1 md:grid-cols-2 gap-2 bottom-12 inset-x-0 px-5 md:px-36 text-secondary">
          <div className="flex flex-col gap-4">
            <p>STAY</p>
            <h2
              className="font-benton-regular
              text-[2rem]
              leading-[1.05]

              md:text-[3.25rem]"
            >
              Sabal House Rooms
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[.75rem] md:text-[1rem]">
              A lighter, more contemporary expression of Sabal House. Refined
              finishes, thoughtful layouts, and a calm sense of ease within the
              new building.
            </p>
            <Link
              className="bg-black text-secondary text-sm uppercase font-bold py-2 px-4 max-w-45"
              href="#"
            >
              EXPLORE YOUR STAY
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
