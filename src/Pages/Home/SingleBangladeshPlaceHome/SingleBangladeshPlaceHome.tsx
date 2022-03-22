import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BangladeshPlace } from "../../../Interfaces/Interfaces";
import BangladeshTourModal from "../../Shared/BangladeshTourModal/BangladeshTourModal";

interface IProps {
  place: BangladeshPlace;
}
const SingleBangladeshPlaceHome: FC<IProps> = ({ place }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img className="rounded-t-lg" src={place.img} alt="" />
        </a>
        <div className="p-6 h-48">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {place.name}
          </h5>
          <p className="text-gray-700 text-base mb-4">
            {place.description.slice(0, 100)}
          </p>
        </div>
        <div className="text-center py-5 flex justify-between p-6">
          <button
            onClick={() => setShowModal(true)}
            type="button"
            className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            View Details
          </button>
          <Link
            to={`/placeDetails/${place._id}__travel-bangladesh__serviceCollection`}
            className="bg-emerald-500 inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
          >
            Book Now
          </Link>
        </div>
        <BangladeshTourModal
          showModal={showModal}
          setShowModal={setShowModal}
          place={place}
        />
      </div>
    </div>
  );
};

export default SingleBangladeshPlaceHome;
