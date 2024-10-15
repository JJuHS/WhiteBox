import React, { useEffect, useState } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu } from "@headlessui/react";
import { useNavigate } from 'react-router-dom';
import "../styles/main/main.css"
import useAuthStore from "../store/useAuthStore";

// 이미지
import logoImsi from '../public/img/logoImsi.svg';
import profileCar from '../public/img/profileCar.svg';

const navigation = [
    { name: 'AI판단', href: '', current: false },
    { name: '게시판', href:  'community/general', current: false },
    { name: '정보', href: 'information', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function Header() {
    const isLogin = !!localStorage.getItem('accessToken');
    const logout = useAuthStore((state) => state.logout);
    const getUser = useAuthStore((state) => state.getUser);
    const navigate = useNavigate();

    const [user, setUser] = useState();

    useEffect(() => {
        setUser(getUser());
    }, [getUser]);

    const handleLogoClick = () => {
        navigate('/');
    }

    const handleProfileClick = () => {
        navigate(`/auth/profile/${user.nickname}`);
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    const handleLoginClick = () => {
        navigate('/auth/login');
    }

    const handleSignupClick = () => {
        navigate('/auth/sign-up');
    }

    return (
        <Disclosure as="nav" className="nav-bar">
            <div className="grid grid-cols-12 gap-x-5 border-b-2 w-full" style={{ height: '72px' }}>
                <div className="col-span-1 mx-auto px-8"></div>
                <div className="relative flex items-center justify-between col-span-10" style={{ minHeight: '72px' }}>
                    <div className="flex flex-none items-center" id="logo">
                        <img
                            alt=""
                            src={logoImsi}
                            className="h-10 w-auto cursor-pointer"
                            onClick={handleLogoClick}
                        />
                    </div>
                    <div className="hidden md:flex flex-grow items-center gap-1">
                        {navigation.map((item) => (
                            <p
                                key={item.name}
                                onClick={() => navigate(item.href)}
                                aria-current={item.current ? "page" : undefined}
                                className={classNames(
                                    item.current ? "bg-gray-900" : "hover:bg-[#B5D2FC] hover:text-gray cursor-pointer",
                                    "text-black font-[550] text-sm items-center menu-button place-content-center"
                                )}
                            >
                                <span className="flex justify-center text-xl">{item.name}</span>
                            </p>
                        ))}
                    </div>
                    <div className="hidden flex-none lg:flex items-center justify-end gap-2">
                        {isLogin ? (
                            <>
                                <div>
                                    <p
                                        onClick={handleProfileClick}
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                                    >
                                        프로필 보기
                                    </p>
                                </div>
                                <div>
                                    <p
                                        onClick={handleLogoutClick}
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                                    >
                                        로그아웃
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p
                                        onClick={handleLoginClick}
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                                    >
                                        로그인
                                    </p>
                                </div>
                                <div>
                                    <p
                                        onClick={handleSignupClick}
                                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700"
                                    >
                                        회원가입
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                    {/* 작은 화면에서의 드롭다운 메뉴 */}
                    <div className="flex flex-none lg:hidden items-center justify-end">
                        <Menu as="div" className="relative inline-block text-left">
                            <Menu.Button className="inline-flex justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {/* 햄버거 아이콘 */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </Menu.Button>

                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                <div className="py-1">
                                    {navigation.map((item) => (
                                        <Menu.Item key={item.name}>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => navigate(item.href)}
                                                    className={classNames(
                                                        active ? 'bg-gray-100' : '',
                                                        'md:hidden w-full text-left px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    {item.name}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    ))}
                                    {/* 로그인/회원가입 또는 프로필/로그아웃 추가 */}
                                    {isLogin ? (
                                        <>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleProfileClick}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'w-full text-left px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        프로필 보기
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleLogoutClick}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'w-full text-left px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        로그아웃
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </>
                                    ) : (
                                        <>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleLoginClick}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'w-full text-left px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        로그인
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleSignupClick}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'w-full text-left px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        회원가입
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </>
                                    )}
                                </div>
                            </Menu.Items>
                        </Menu>
                    </div>
                </div>
                <div className="col-span-1"></div>
            </div>
            {/* 작은 화면인 경우 */}
            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                                item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}

export default Header;
