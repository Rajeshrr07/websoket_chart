// export const fetchMetrics = async () => {
//     const response = await fetch("https://6749e915868020296633113e.mockapi.io/metricks");
//     console.log('response: ', response);
//     if (!response.ok) throw new Error("Failed to fetch metrics");
//     return response.json();
//   };
  

export const fetchMetrics = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve([
            { id: 1, name: "Metric 1", value: 100 },
            { id: 2, name: "Metric 2", value: 200 },
            { id: 3, name: "Metric 3", value: 300 },
          ]);
        } else {
          reject(new Error("Failed to fetch metrics"));
        }
      }, 1000);
    });
  };
  