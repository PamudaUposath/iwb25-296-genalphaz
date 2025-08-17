import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const translations = {
  en: {
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    giveHopeGiveLife: "Give hope, give life.",
    urgentAlerts: "Urgent Alerts",
    seeAll: "See all",
    liveBloodStock: "Live Blood Stock",
    units: "units",
    urgent: "Urgent",
    low: "Low",
    normal: "Normal",
    quickActions: "Quick Actions",
    bookAppointment: "Book Appointment",
    scheduleDonation: "Schedule donation",
    myPoints: "My Points",
    totalDPoints: "Total D Points",
    historyEligibility: "History & Eligibility",
    whenCanIDonate: "When can I donate?",
    reminders: "Reminders",
    setAlertsForDonations: "Set alerts for donations",
    notifications: "Notifications",
    youHaveNewAlerts: "You have {count} new alerts",
    appointmentConfirmed: "Appointment confirmed",
    bloodDonationReminder: "Blood donation reminder",
    pleaseEnterTitleAndDate: "Please enter title and date/time",
    reminderSet: "Reminder set",
    eligibleIn: "Eligible in {days} days",
    untilNextDonation: "{percent} until next donation",
    approxDistance: "Approximately {distance} away",
    neededIn: "Needed in {time}",
    setReminder: "Set Reminder",
    reminderTitle: "Reminder Title",
    enterReminderTitle: "Enter reminder title",
    dateTime: "Date & Time",
    selectDateTime: "Select date & time",
    saveReminder: "Save Reminder",
    yourReminders: "Your Reminders:",
    noRemindersSet: "No reminders set",
    home: 'Home',
    alerts: 'Alerts',
    profile: 'Profile',
    leaderboard: 'Leaderboard',
    more: 'More',
    language: 'Language',
  },
  si: { 
    goodMorning: "සුභ උදෑසනක්",
    goodAfternoon: "සුභ දවල් මැදහත්",
    goodEvening: "සුභ සන්ධ්‍යාවක්",
    giveHopeGiveLife: "අපහසුතාවයට උදව් කරන්න",
    urgentAlerts: "ඉක්මන් අවවාද",
    seeAll: "සියල්ල බලන්න",
    liveBloodStock: "සජීවී රුධිර තොගය",
    units: "ඒකක",
    urgent: "ඉක්මන්",
    low: "අඩු",
    normal: "සාමාන්‍ය",
    quickActions: "දැන්ම කරන්න",
    bookAppointment: "නියමිත පත්කිරීම",
    scheduleDonation: "ද්ාන සැලසුම් කරන්න",
    myPoints: "මගේ ලකුණු",
    totalDPoints: "මුළු D ලකුණු",
    historyEligibility: "ඉතිහාසය සහ සුදුසුකම",
    whenCanIDonate: "කවදා දායක විය හැකිද?",
    reminders: "මතක් කිරීම්",
    setAlertsForDonations: "දායක කිරීම් සඳහා අවවාද සකසන්න",
    notifications: "සංදේශ",
    youHaveNewAlerts: "ඔබට {count} නව අවවාද ඇත",
    appointmentConfirmed: "පත්කිරීම තහවුරු කර ඇත",
    bloodDonationReminder: "රුධිර දායක මතක් කිරීම",
    pleaseEnterTitleAndDate: "කරුණාකර මාතෘකාව සහ දිනය ඇතුළත් කරන්න",
    reminderSet: "මතක් කිරීම සකසා ඇත",
    eligibleIn: "{days} දිනකින් සුදුසුයි",
    untilNextDonation: "ඊළඟ දායකත්වයට {percent}",
    approxDistance: "සමීපව {distance}",
    neededIn: "{time} තුළ අවශ්‍යයි",
    setReminder: "මතක් කිරීම සකසන්න",
    reminderTitle: "මතක් කිරීමේ මාතෘකාව",
    enterReminderTitle: "මතක් කිරීමේ මාතෘකාව ඇතුල් කරන්න",
    dateTime: "දිනය සහ වේලාව",
    selectDateTime: "දිනය සහ වේලාව තෝරන්න",
    saveReminder: "මතක් කිරීම සුරකින්න",
    yourReminders: "ඔබේ මතක් කිරීම්:",
    noRemindersSet: "මතක් කිරීම් නොමැත",
    home: 'මුල් පිටුව',
    alerts: 'ඇගවීම්',
    profile: 'පැතිකඩ',
    leaderboard: 'විසඳුම් ලැයිස්තුව',
    more: 'තවත්',
    language: 'භාෂාව',
  },
  ta: {
    home: 'முகப்பு',
    alerts: 'அலெர்ட்கள்',
    profile: 'சுயவிவரம்',
    leaderboard: 'வெற்றி பட்டியல்',
    more: 'மேலும்',
    language: 'மொழி',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Function to get translation by key
  const t = (key) => {
    return translations[language][key] || key;
  };

  // Change language function
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
