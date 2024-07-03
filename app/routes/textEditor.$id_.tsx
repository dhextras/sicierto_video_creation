export default function TextEditor() {
  return (
    <div className="flex flex-col w-full">
      <div>TextEditor</div>
      <textarea
        style={{ width: "90%", height: "350px" }}
        placeholder="Your text will be here soon..."
      />
    </div>
  );
}
