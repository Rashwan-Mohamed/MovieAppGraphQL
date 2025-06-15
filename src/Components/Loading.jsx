import { ThreeDots } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className="centerLoading">
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#d70654"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
        </div>
    )
}