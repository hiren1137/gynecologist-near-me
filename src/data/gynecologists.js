export const sampleGynecologists = {
  "maharashtra": [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      qualification: "MBBS, MD (Obstetrics & Gynecology)",
      experience: "15 years",
      specialization: ["High-Risk Pregnancy", "Laparoscopic Surgery", "Infertility Treatment"],
      hospital: "Lilavati Hospital",
      city: "Mumbai",
      address: "A-791, Bandra Reclamation, Bandra West, Mumbai - 400050",
      phone: "+91 98765 43210",
      rating: 4.8,
      reviews: 245,
      consultationFee: "₹1,200",
      image: "/doctors/dr-priya-sharma.jpg"
    },
    {
      id: 2,
      name: "Dr. Anjali Desai",
      qualification: "MBBS, MS (Obstetrics & Gynecology)",
      experience: "12 years",
      specialization: ["Normal Delivery", "Cesarean Section", "Gynecological Disorders"],
      hospital: "Ruby Hall Clinic",
      city: "Pune",
      address: "40, Sassoon Road, Pune - 411001",
      phone: "+91 98765 43211",
      rating: 4.6,
      reviews: 189,
      consultationFee: "₹800",
      image: "/doctors/dr-anjali-desai.jpg"
    },
    {
      id: 3,
      name: "Dr. Meera Kulkarni",
      qualification: "MBBS, MD (Obstetrics & Gynecology), Fellowship in Reproductive Medicine",
      experience: "18 years",
      specialization: ["IVF Treatment", "Endometriosis", "PCOS Management"],
      hospital: "Orange City Hospital",
      city: "Nagpur",
      address: "34, Central Avenue, Nagpur - 440018",
      phone: "+91 98765 43212",
      rating: 4.9,
      reviews: 312,
      consultationFee: "₹1,000",
      image: "/doctors/dr-meera-kulkarni.jpg"
    }
  ],
  "karnataka": [
    {
      id: 4,
      name: "Dr. Lakshmi Rao",
      qualification: "MBBS, MD (Obstetrics & Gynecology)",
      experience: "20 years",
      specialization: ["Maternal Medicine", "Fetal Medicine", "Gynecological Oncology"],
      hospital: "Manipal Hospital",
      city: "Bangalore",
      address: "98, Rustom Bagh, Airport Road, Bangalore - 560017",
      phone: "+91 98765 43213",
      rating: 4.7,
      reviews: 278,
      consultationFee: "₹1,500",
      image: "/doctors/dr-lakshmi-rao.jpg"
    },
    {
      id: 5,
      name: "Dr. Sunitha Reddy",
      qualification: "MBBS, MS (Obstetrics & Gynecology)",
      experience: "14 years",
      specialization: ["Adolescent Gynecology", "Menopause Management", "Contraceptive Counseling"],
      hospital: "KMC Hospital",
      city: "Mangalore",
      address: "Attavar, Mangalore - 575001",
      phone: "+91 98765 43214",
      rating: 4.5,
      reviews: 156,
      consultationFee: "₹700",
      image: "/doctors/dr-sunitha-reddy.jpg"
    }
  ],
  "tamil-nadu": [
    {
      id: 6,
      name: "Dr. Kavitha Krishnan",
      qualification: "MBBS, MD (Obstetrics & Gynecology), DNB",
      experience: "16 years",
      specialization: ["High-Risk Pregnancy", "Minimally Invasive Surgery", "Reproductive Endocrinology"],
      hospital: "Apollo Hospital",
      city: "Chennai",
      address: "21, Greams Lane, Off Greams Road, Chennai - 600006",
      phone: "+91 98765 43215",
      rating: 4.8,
      reviews: 298,
      consultationFee: "₹1,300",
      image: "/doctors/dr-kavitha-krishnan.jpg"
    },
    {
      id: 7,
      name: "Dr. Radha Venkatesh",
      qualification: "MBBS, MS (Obstetrics & Gynecology)",
      experience: "11 years",
      specialization: ["Normal Delivery", "Pregnancy Care", "Women's Health"],
      hospital: "Coimbatore Medical College Hospital",
      city: "Coimbatore",
      address: "Avinashi Road, Coimbatore - 641014",
      phone: "+91 98765 43216",
      rating: 4.4,
      reviews: 134,
      consultationFee: "₹600",
      image: "/doctors/dr-radha-venkatesh.jpg"
    }
  ],
  "delhi": [
    {
      id: 8,
      name: "Dr. Neha Gupta",
      qualification: "MBBS, MD (Obstetrics & Gynecology), Fellowship in Maternal Fetal Medicine",
      experience: "17 years",
      specialization: ["High-Risk Pregnancy", "Fetal Medicine", "Genetic Counseling"],
      hospital: "All India Institute of Medical Sciences (AIIMS)",
      city: "New Delhi",
      address: "Ansari Nagar, New Delhi - 110029",
      phone: "+91 98765 43217",
      rating: 4.9,
      reviews: 387,
      consultationFee: "₹1,000",
      image: "/doctors/dr-neha-gupta.jpg"
    }
  ],
  "gujarat": [
    {
      id: 9,
      name: "Dr. Ritu Patel",
      qualification: "MBBS, MS (Obstetrics & Gynecology)",
      experience: "13 years",
      specialization: ["Laparoscopic Surgery", "Infertility Treatment", "Gynecological Disorders"],
      hospital: "Sterling Hospital",
      city: "Ahmedabad",
      address: "Near Gurukul, Memnagar, Ahmedabad - 380052",
      phone: "+91 98765 43218",
      rating: 4.6,
      reviews: 201,
      consultationFee: "₹900",
      image: "/doctors/dr-ritu-patel.jpg"
    }
  ],
  "west-bengal": [
    {
      id: 10,
      name: "Dr. Soma Chatterjee",
      qualification: "MBBS, MD (Obstetrics & Gynecology), MRCOG",
      experience: "19 years",
      specialization: ["Gynecological Oncology", "Endoscopic Surgery", "Reproductive Medicine"],
      hospital: "AMRI Hospital",
      city: "Kolkata",
      address: "P-4 & 5, CIT Scheme LXXII, Near Kankurgachi, Kolkata - 700054",
      phone: "+91 98765 43219",
      rating: 4.7,
      reviews: 256,
      consultationFee: "₹1,100",
      image: "/doctors/dr-soma-chatterjee.jpg"
    }
  ]
};

export const getGynecologistsByState = (stateSlug) => {
  return sampleGynecologists[stateSlug] || [];
};

export const getAllGynecologists = () => {
  return Object.values(sampleGynecologists).flat();
}; 