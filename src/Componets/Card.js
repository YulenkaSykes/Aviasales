import React from "react";

const Card = ({ ticket }) => {
  const { carrier, price, segments } = ticket;

  const fixDate = (d) => (d.toString().length < 2 ? "0" + d : d);

  return (
    <div className="card col centered shadow">
      <div className="row centered card_c">
        <h5 className="price">{price} P</h5>
        <img src={`http://pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </div>
      {segments.map((segment, i) => {
        const duration = new Date();
        duration.setMinutes(segment.duration);

        const date = new Date(Date.parse(segment.date));
        const arrivalDate = new Date(date - duration * 60);

        return (
          <div key={i} className="row centered segment-wrapper">
            <div className="col colum chentered">
              <span className="grey">
                {segment.origin}-{segment.destination}
              </span>
              <span>
                {fixDate(arrivalDate.getHours())}:
                {fixDate(arrivalDate.getMinutes())} - {fixDate(date.getHours())}
                :{fixDate(date.getMinutes())}
              </span>
            </div>
            <div className="col colum centered">
              <span className="grey">duration</span>
              <span>
                {fixDate(duration.getHours())}h {fixDate(duration.getMinutes())}
                m
              </span>
            </div>
            <div className="col colum centered">
              <span className="grey">transfers</span>
              <div className="row centered">
                {segment.stops.map((stop) => (
                  <span>{stop} </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
