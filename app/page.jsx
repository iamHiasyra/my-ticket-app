import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http:/localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
  const uniqueCat = [...new Set(tickets?.map(({ category }) => category))];

  return (
    <div className="p-5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div>
          {tickets &&
            uniqueCat?.map((cat, catIndex) => (
              <div className="mb-4" key={catIndex}>
                <h2>{cat}</h2>
                <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                  {tickets
                    .filter((ticket) => ticket.category === uniqueCat)
                    .map((filterTicket, _index) => (
                      <TicketCard
                        id={_index}
                        key={_index}
                        ticket={filterTicket}
                      />
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
