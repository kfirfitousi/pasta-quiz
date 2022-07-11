type Props = {
    children?: React.ReactNode
}

function Container({ children }: Props) {
    return <div className="container max-w-2xl m-auto px-4 select-none">{children}</div>
}

export default Container