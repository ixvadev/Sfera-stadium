function isToken(): string | null {
    const token = localStorage.getItem("token")
    console.log(token);
    return token
}

export const config = {
    headers: {
        'Authorization': `Bearer ${isToken()}`,
    }
}