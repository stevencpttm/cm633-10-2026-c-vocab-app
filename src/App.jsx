function App() {
  return (
    <div className="p-4 text-center min-h-screen bg-slate-200">
      <h1 className="text-center text-4xl font-bold my-8">Vocab App</h1>
      <div className="flex gap-2">
        <input
          type="text"
          className="bg-white w-full rounded-lg p-4 text-2xl"
        />
        <button className="bg-black px-4 py-2 text-2xl text-white rounded-lg">
          Query
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg mt-4">
        <h4 className="italic text-slate-400">Definition</h4>
        <p className="text-left my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, possimus
          perspiciatis esse beatae modi mollitia debitis nostrum cumque
          accusantium dolores, expedita quibusdam quos ea iste incidunt cum
          numquam qui dolor.
        </p>
      </div>
    </div>
  );
}

export default App;
