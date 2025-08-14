export const fetchUserFromCustomAPI = async () => {
    const res = await fetch('/data/user.json');

    if (!res.ok) {
        throw new Error('خطا در دریافت اطلاعات کاربر');
    }

    const data = await res.json();
    return data.results?.[0]; // چون داخل results هست
};
