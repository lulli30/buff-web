const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gray-950 text-white">
      <div className="w-full px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Title Section */}
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-white bg-clip-text text-transparent">
          Key Features
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Elevate your gym experience with cutting-edge tools designed for
          efficiency.
        </p>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Membership Management",
              desc: "Automate renewals, track subscriptions, and manage users effortlessly.",
              icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
            },
            {
              title: "Class & Workout Scheduling",
              desc: "Enable members to book workouts and track their fitness routines.",
              icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
            },
            {
              title: "Secure Payments",
              desc: "Accept online payments and manage billing with ease.",
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="relative bg-gray-800/80 backdrop-blur-lg p-10 rounded-2xl text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:scale-105 duration-300 border border-gray-700/50"
            >
              {/* Glowing Effect on Hover */}
              <div className="absolute inset-0 bg-teal-400/10 opacity-0 group-hover:opacity-20 transition"></div>

              {/* Icon Container */}
              <div className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-400 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={feature.icon}
                  />
                </svg>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-2xl font-semibold text-teal-400">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
