import TicketCard from "./(components)/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http:/localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const data = await getTickets();

  if (!data?.tickets) {
    return <p>No ticket.</p>;
  }

  const tickets = data.tickets;
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];

  return (
    <div className="p-5">
      <div>
        <div>
          {tickets &&
            uniqueCategories?.map((uniqueCategory, categoryIndex) => (
              <div className="mb-4" key={categoryIndex}>
                <h2>{uniqueCategory}</h2>
                <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                  {tickets
                    .filter((ticket) => ticket.category === uniqueCategory)
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
