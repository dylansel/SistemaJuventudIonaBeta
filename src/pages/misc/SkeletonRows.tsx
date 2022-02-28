import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonRows() {
    let body = []
    for (let i = 1; i <= 200; i++) {
        body.push(<tr className='skeleton'>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
        </tr>)
    }
    return <>{body}</>
}

export default SkeletonRows
