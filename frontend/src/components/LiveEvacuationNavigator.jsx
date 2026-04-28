import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LiveEvacuationNavigator = () => {
  const [routes, setRoutes] = useState([
    { id: 1, color: 'green', status: 'Safe' },
    { id: 2, color: 'yellow', status: 'Slow' },
    { id: 3, color: 'red', status: 'Danger' }
  ]);

  return (
    <motion.div className="navigator glass" initial={{ y: 100 }} animate={{ y: 0 }}>
      <h2>Live Evacuation Navigator</h2>
      <div className="map-placeholder">
        <div className="exits">
          <div className="exit safe">Safe Exit</div>
          <div className="exit blocked">Blocked Exit</div>
        </div>
        <div className="zones">
          <div className="zone fire">Fire Zone</div>
          <div className="zone crowd">Crowd Zone</div>
        </div>
        <div className="routes">
          {routes.map((route) => (
            <motion.div key={route.id} className={`route ${route.color}`} animate={{ opacity: route.status === 'Safe' ? 1 : 0.5 }}>
              Route {route.id}: {route.status}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LiveEvacuationNavigator;