"use client";

import { FC, useEffect, useState } from "react";

interface Props {
  generatedAt: string;
}

const loadedAt = new Date().toLocaleString("pl");

export const ClientSideTime: FC<Props> = ({ generatedAt }) => {
  const [showClientTimes, setShowClientTimes] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString("pl")
  );

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTime(new Date().toLocaleString("pl")),
      1000
    );

    // prevents rendering time server side
    setShowClientTimes(true);

    return () => clearInterval(interval);
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <td>Page generated at:</td>
          <td>{generatedAt}</td>
        </tr>
        <tr>
          <td>Component loaded at:</td>
          <td>{showClientTimes && loadedAt}</td>
        </tr>
        <tr>
          <td>Current time:</td>
          <td>{showClientTimes && currentTime}</td>
        </tr>
      </tbody>
    </table>
  );
};
