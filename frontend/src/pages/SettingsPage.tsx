import { useCallback, useState, type ComponentType } from "react";
import {
  Archive,
  AtSign,
  Bell,
  Bookmark,
  Crown,
  Eye,
  EyeOff,
  Globe,
  Heart,
  ListMinus,
  Lock,
  MessageCircle,
  MessageSquare,
  Settings,
  Share2,
  Type,
  User,
  Users,
} from "lucide-react";

type SettingsSection = "Edit profile" | (typeof SETTINGS_SECTIONS)[number]["title"];

type Section = {
  title: string;
  icon: ComponentType<{ size?: number }>;
};

const SETTINGS_SECTIONS = [
  { title: "Edit profile", icon: User },
  { title: "Notifications", icon: Bell },
  { title: "Account privacy", icon: Lock },
  { title: "Close Friends", icon: Users },
  { title: "Blocked", icon: EyeOff },
  { title: "Messages and story replies", icon: MessageSquare },
  { title: "Tags and mentions", icon: AtSign },
  { title: "Comments", icon: MessageCircle },
  { title: "Sharing", icon: Share2 },
  { title: "Restricted accounts", icon: ListMinus },
  { title: "Hidden Words", icon: Type },
  { title: "Muted accounts", icon: Eye },
  { title: "Content preferences", icon: Bookmark },
  { title: "Like and share counts", icon: Heart },
  { title: "Subscriptions", icon: Crown },
  { title: "Archiving and downloading", icon: Archive },
  { title: "Language", icon: Globe },
] as const satisfies readonly Section[];

const INPUT_CLASS_NAME =
  "w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>("Edit profile");

  const selectSection = useCallback((section: SettingsSection) => {
    setActiveSection(section);
  }, []);

  return (
    <main className="flex min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#0d0d0d] dark:text-gray-100">
      <aside className="w-20 shrink-0 overflow-y-auto border-r border-gray-200 bg-white transition-colors duration-300 sm:w-72 dark:border-gray-800 dark:bg-[#121212]">
        <h1 className="border-b border-gray-200 p-4 text-2xl font-semibold dark:border-gray-800">
          <span className="hidden sm:inline">Settings</span>
          <span className="sr-only">Settings navigation</span>
        </h1>

        <nav aria-label="Settings sections" className="flex flex-col py-1">
          {SETTINGS_SECTIONS.map(({ title, icon: Icon }) => {
            const isActive = activeSection === title;

            return (
              <button
                key={title}
                type="button"
                onClick={() => selectSection(title)}
                aria-current={isActive ? "page" : undefined}
                title={title}
                className={`flex items-center justify-center gap-3 px-4 py-3 text-left text-sm transition-colors duration-200 sm:justify-start ${
                  isActive
                    ? "bg-gray-100 font-semibold dark:bg-gray-800"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="hidden sm:inline">{title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="flex flex-1 justify-center overflow-y-auto bg-white transition-colors duration-300 dark:bg-[#121212]">
        <div className="w-full max-w-xl p-5 sm:p-8">
          {activeSection === "Edit profile" ? <EditProfile /> : <SectionPlaceholder title={activeSection} />}
        </div>
      </section>
    </main>
  );
};

const EditProfile = () => (
  <form className="w-full" onSubmit={(event) => event.preventDefault()}>
    <h2 className="mb-6 text-xl font-semibold">Edit Profile</h2>

    <div className="mb-6 flex items-center gap-4">
      <img
        src="https://i.pravatar.cc/100?u=amardeep"
        alt="10_amardeep_16 profile"
        className="h-20 w-20 rounded-full border border-gray-300 object-cover dark:border-gray-700"
      />
      <div>
        <h3 className="text-lg font-semibold">10_amardeep_16</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">अमरदीप द्विवेदी</p>
        <button type="button" className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
          Change photo
        </button>
      </div>
    </div>

    <div className="mb-5">
      <label htmlFor="website" className="mb-1 block text-sm font-medium">Website</label>
      <input id="website" type="url" placeholder="Website" className={INPUT_CLASS_NAME} />
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Editing your links is only available on mobile.</p>
    </div>

    <div className="mb-5">
      <label htmlFor="bio" className="mb-1 block text-sm font-medium">Bio</label>
      <textarea id="bio" rows={3} maxLength={150} placeholder="Add bio..." className={INPUT_CLASS_NAME} />
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">137 / 150</p>
    </div>

    <div className="mb-5">
      <label htmlFor="gender" className="mb-1 block text-sm font-medium">Gender</label>
      <select id="gender" defaultValue="Male" className={INPUT_CLASS_NAME}>
        <option>Male</option>
        <option>Female</option>
        <option>Custom</option>
      </select>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">This won’t be part of your public profile.</p>
    </div>

    <button type="submit" className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
      Submit
    </button>
  </form>
);

const SectionPlaceholder = ({ title }: { title: string }) => (
  <div className="mt-32 text-center text-gray-500 dark:text-gray-400">
    <Settings className="mx-auto mb-3" size={28} aria-hidden="true" />
    <p>{title} settings coming soon...</p>
  </div>
);

export default SettingsPage;
