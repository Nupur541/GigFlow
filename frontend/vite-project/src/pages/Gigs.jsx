import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs").then(res => setGigs(res.data));
  }, []);

  return (
    <div>
      <h1>Open Gigs</h1>
      {gigs.map(gig => (
        <div key={gig._id}>
          <h3>{gig.title}</h3>
          <p>{gig.description}</p>
          <Link to={`/gigs/${gig._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default Gigs;
