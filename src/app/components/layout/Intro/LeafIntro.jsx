"use client";

export default function LeafIntro({
  title = "A Quiet Place To Come Alive",
  intro = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex.",
}) {
  return (
    <section>
      <div className="left-leafs"></div>
      <div className="content">
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      <div className="right-leafs"></div>
    </section>
  );
}
