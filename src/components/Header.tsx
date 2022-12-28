import { Dropdown, DropdownItem } from "../ui/dropdown";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { FaBars, FaGithub, FaLink, FaUser } from "react-icons/fa";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [disabled, setDisabled] = useState(false);
  const [closing, setClosing] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setDisabled(true);
    setClosing(true);
    try {
      await signOut({
        callbackUrl: "/",
      });
    } finally {
      setDisabled(false);
      setClosing(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto px-4 py-4 ">
        <div className="relative flex items-center">
          {(status === "unauthenticated" && (
            <Link
              href="/auth"
              className="ml-auto block px-4 text-lg text-white hover:text-yellow-500"
            >
              Sign In
            </Link>
          )) ||
            (status == "authenticated" && (
              <Dropdown
                title={session?.user?.name || "Menu"}
                className="ml-auto block px-4 text-lg text-white hover:text-yellow-500"
                icon={<FaBars className="h-4 text-inherit" />}
              >
                {status === "authenticated" && (
                  <DropdownItem
                    icon={<FaUser className="h-4 text-inherit text-white" />}
                    onClick={handleLogout}
                  >
                    Sign Out
                  </DropdownItem>
                )}

                <a
                  href="https://github.com/awtkns/estimator/issues/new"
                  target="_blank"
                  rel="noreferrer"
                >
                  <DropdownItem icon={<FaLink className="h-4 text-inherit" />}>
                    Report a bug
                  </DropdownItem>
                </a>
              </Dropdown>
            ))}
          <a
            href="https://github.com/awtkns/estimator"
            className="right-0 block text-white hover:text-yellow-500"
          >
            <span className="sr-only">Estimator on GitHub</span>
            <FaGithub size="20" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;