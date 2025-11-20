
 {/* <div className="flex flex-col">
<div className="border-b border-gray-200 dark:border-gray-700 px-4">
<div className="flex gap-8">
<a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-[13px] pt-4" href="#">
<p className="text-primary text-sm font-bold leading-normal tracking-[0.015em]" ><Link>Upcoming</Link></p>
</a>
<a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-gray-500 dark:text-gray-400 pb-[13px] pt-4 hover:text-gray-700 dark:hover:text-gray-200" href="#">
<p className="text-sm font-bold leading-normal tracking-[0.015em]"><Link>Completed</Link></p>
</a>
<a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-gray-500 dark:text-gray-400 pb-[13px] pt-4 hover:text-gray-700 dark:hover:text-gray-200" href="#">
<p className="text-sm font-bold leading-normal tracking-[0.015em]"><Link>Canceled</Link></p>
</a>
</div>
</div>
<div className="flex flex-col gap-4 mt-6">
<
<div className="bg-white dark:bg-[#1C2A38] rounded-xl shadow-sm p-4 flex items-center gap-4">
<div className="shrink-0 h-12 w-1.5 bg-primary rounded-full"></div>
<div className="grow grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
<div className="flex flex-col">
<p className="text-sm text-gray-500 dark:text-gray-400">Surgery</p>
</div>
<div className="flex flex-col">
<p className="text-sm text-gray-500 dark:text-gray-400">Doctor</p>
</div>
<div className="flex flex-col">
<p className="text-sm text-gray-500 dark:text-gray-400">Date &amp; Time</p>

</div>

</div>
</div>
</div>
</div> */}

            
            {/* <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-10">
              <h2 className="text-2xl font-bold mb-4">All surgeries</h2>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-10">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tb scope="col" className="py-3 px-6">
                    ID
                  </tb>
                  <th scope="col" className="py-3 px-6">
                    Description
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Doctor ID
                  </th>
                  <tbody scope="col" className="py-3 px-6">
                    Surgery Date
                  </tbody>
                  <tbody scope="col" className="py-3 px-6">
                    Time
                  </tbody>
                  <tbody scope="col" className="py-3 px-6">
                    Surgery Type
                  </tbody>
                </thead>
                <tbody>
                  {Array.isArray(surgeries) &&
                    surgeries.map((surgery) => {
                      return (
                        <tr
                          key={surgery.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="py-4 px-6">{surgery.description}</td>
                          <td className="py-4 px-6">{surgery.doctorId}</td>
                          <td className="py-4 px-6">{surgery.surgeryDate}</td>
                          <td className="py-4 px-6">{surgery.time}</td>
                          <td className="py-4 px-6">{surgery.surgeryType}</td>
                          <Link to={`/appointment/${surgery._id}`}>
                            {" "}
                            View more
                          </Link>

                          <td className="py-4 px-6">
                            <Link
                              to={`/upcomingAppointment/${surgery.id}`}
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                            >
                              View more
                            </Link>

                            <button
                              onClick={() => {
                                setEditMode(true);
                                setDescription(surgery.description);
                                setDoctorId(surgery.doctorId);
                                setSurgeryDate(surgery.surgeryDate);
                                setTime(surgery.time);
                                setSurgeryType(surgery.surgeryType);
                                setSurgeryId(surgery._id);
                              }}
                              type="button"
                              className="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => {
                                deleteBook(surgery.id);
                              }}
                              type="button"
                              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div> */}