function isObjectEmpty(user) {
    return (typeof user === 'object' && Object.keys(user).length === 0)
}

export default isObjectEmpty