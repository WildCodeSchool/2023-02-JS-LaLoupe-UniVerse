export default function SearchBar() {
  return (
    <section className="justify-center hidden">
      <input
        className="w-9/12 sm:w-6/12 h-7 rounded-xl px-2 shadow-md my-5 shadow-gray-600"
        type="text"
        placeholder="Que souhaitez-vous écouter ? "
      />
      <img
        className="w-5 h-5 relative right-7 top-6"
        src="../src/assets/loupe.png"
        alt="loupe"
      />
    </section>
  );
}
