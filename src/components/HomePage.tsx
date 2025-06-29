import { useNavigate } from "react-router-dom";
// import RotatingImageCard from "./Card";
import { CardData } from "./Data/CardData";
const floatingStyle = `
  @keyframes float {
    0%, 100% {
      transform: translate(0);
    }
    50% {
      transform: translate(40px, -40px);
    }
  }

  .float-animation {
    animation: float 3s ease-in-out infinite;
  }
`;
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = floatingStyle;
  document.head.appendChild(styleElement);
}

const HomePage = () => {

  const navigate = useNavigate();

  const Category = (title: any) => {
    navigate(`/${title}`);
  };


  return (
    <div className="">
      <div className=" min-h-screen flex flex-col items-center justify-center px-6 py-6">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Text Section */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enhancing student lives through <br />
              <span className="text-red-600">creativity</span>, <span className="text-yellow-600">passion</span>, and<br />
              <span className="italic font-semibold text-blue-600">purposeful activities.</span>
            </h1>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <img
              src="https://www.learnlife.com/hs-fs/hubfs/Ikigai%20model.png?width=600&name=Ikigai%20model.png"
              alt="Life Purpose Venn Diagram"
              className="rounded-lg w-full max-w-md mx-auto float-animation"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-col sm:shadow-2xl rounded-2xl justify-center items-center mx-30 my-">
        {CardData.map((card, index) => (
          <div className="mr-25 ml-25 mt-0 ">
            <div className="flex">

              <div className="flex items-center rounded-2xl bg-gray-100 p-5 my-10">
                <div className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center gap-6`}>
                  {card.image && (
                    <img
                      src={card.image[0]}
                      alt={card.title}
                      className="h-54 w-54 object-contain mb-4"
                    />
                  )}
                  <div className="flex-col">
                    {card.context &&
                      (
                        <p className="text-xl ml-10">
                          {card.context}
                        </p>

                      )}

                    <div className="mt-4 mb-2 flex justify-center text-center text-xl ">
                      <button className="cursor-pointer border px-12 py-3 hover:bg-gray-700 rounded-xl bg-gray-900 text-white" onClick={() => Category(card.title)}>
                        {card.title}
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )
        )}
      </div>


      <div className="font-serif flex flex-col w- sm:w-355 sm:flex-row items-center bg-white shadow-2xl sm:m-12 py-12 px-6 md:px-20 text-gray-800">
        <div>
          <img className="h-70 w-full sm:h-100 sm:w-350" src="about.png" alt="" />
        </div>

        <div className="sm:ml-15 flex-col mt-5 items-">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">About Us</h2>

          <p className="text-lg leading-relaxed mb-6 ">
            <strong>Atrangi</strong> is a vibrant community of artists and writers dedicated to nurturing creativity and self-expression. We believe every individual has a unique artistic voice, and our mission is to provide a platform where that voice can be heard, seen, and celebrated.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            From powerful writing to expressive sketches, paintings, and crafts — Atrangi encourages individuals to explore their passions and use art as a medium to connect with society. Through open mics, art competitions, and collaborative initiatives, we inspire students to not only showcase their talent but also grow by learning from one another.
          </p>

        </div>
      </div>

    </div>
  );
};

export default HomePage;
