type ContainerProps = {
    children?: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return <div className="container max-w-2xl m-auto px-4 select-none">{children}</div>;
};

export default Container;
