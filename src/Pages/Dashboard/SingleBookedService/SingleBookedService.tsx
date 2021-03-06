import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BookedService } from "../../../Interfaces/Interfaces";
import { cancleOrder } from "../../../redux/slices/bookingServiceSlice";
import PaymentModal from "../../Shared/PaymentModal/PaymentModal";

interface IProps {
  booking: BookedService;
}

const SingleBookedService: FC<IProps> = ({ booking }) => {
  const [singlePlace, setSinglePlace] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { order_id, c, d, pack, status, payment_status, address, _id } =
    booking;
  let duration = "0";
  if (pack === "1") {
    duration = "30 Days";
  } else if (pack === "2") {
    duration = "100 Days";
  } else if (pack === "3") {
    duration = "6 Months";
  } else if (pack === "4") {
    duration = "1 Year";
  }
  useEffect(() => {
    fetch(`http://localhost:5000/random?d=${d}&c=${c}&id=${order_id}`)
      .then((res) => res.json())
      .then((data) => {
        setSinglePlace(data);
      });
  }, [c, d, order_id]);

  const handleDelete = (id: string) => {
    const isDelete = window.confirm("Are you sure?");
    if (isDelete) {
      fetch(`http://localhost:5000/booking/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.acknowledged) {
            alert("Booking Cancle Successfully");
            dispatch(cancleOrder(id));
          }
        });
    }
  };
  return (
    <div className="border my-3 p-2 flex justify-between">
      <div>
        <h1>Order ID: {order_id}</h1>
        <h1>Place Name : {singlePlace.name}</h1>
        <h1>Location : {singlePlace.location}</h1>
        <h1>Cost : {parseInt(pack) * singlePlace.price}$</h1>
        <h1>Duration: {duration}</h1>
        <h1>Status : {status}</h1>
        <h1>
          Payment Status :{" "}
          <span
            className={
              payment_status === "Unpaid"
                ? "text-red-600 font-bold"
                : "text-green-600 font-bold"
            }
          >
            {payment_status}
          </span>
        </h1>
        <h1>Starting address : {address}</h1>
        <button
          onClick={() => setShowModal(true)}
          disabled={payment_status !== "Unpaid"}
          className=" bg-green-600 px-3 py-2 my-2 text-white rounded hover:bg-green-700 font-bold disabled:bg-gray-400"
        >
          Make Payment
        </button>
      </div>
      <div>
        <button
          onClick={() => handleDelete(_id)}
          className=" bg-red-500 px-3 py-2 rounded text-white"
        >
          Cancle
        </button>
      </div>
      <PaymentModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default SingleBookedService;
