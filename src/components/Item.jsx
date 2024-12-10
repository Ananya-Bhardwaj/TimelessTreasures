import { useState, useEffect, useContext } from "react";
import { itemStatus } from "../utils/itemStatus";
import { formatTime, formatMoney } from "../utils/formatString";
import { ModalsContext } from "../contexts/ModalsProvider";
import { ModalTypes } from "../utils/modalTypes";
import PropTypes from "prop-types";
import ModelCard from "./ModelGPT";

export const Item = ({ item }) => {
  const { openModal } = useContext(ModalsContext);

  // const [primaryImageSrc, setPrimaryImageSrc] = useState("");
  const [bids, setBids] = useState(0);
  const [amount, setAmount] = useState(item.amount);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const status = itemStatus(item);
    setBids(status.bids);
    setAmount(formatMoney(item.currency, status.amount));
  }, [item]);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const remaining = item.endTime - now;

      if (remaining > 0) {
        setTimeLeft(formatTime(remaining));
        requestAnimationFrame(updateTimer);
      } else {
        setTimeLeft("Item Ended");
      }
    };

    requestAnimationFrame(updateTimer);
  }, [item.endTime]);

  // useEffect(() => {
  //   import(`../assets/${item.primaryImage}.glb`).then((src) => {
  //     setPrimaryImageSrc(src.default)
  //   })
  // }, [item.primaryImage])


  return (
    <div className="col">
      <ModelCard 
        model={item.modelName}
        title={item.title}
        subtitle={item.subtitle}
        description={item.detail}
        amount={amount}
        bids={bids}
        timeLeft={timeLeft} 
        onButtonClick={() => openModal(ModalTypes.ITEM, item)}
      />
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    startingPrice: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    endTime: PropTypes.object.isRequired,
    primaryImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    modelName: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired
  })
}