import { FC, ReactNode } from 'react'

type BasicModalProps = {
    title: string
    body: ReactNode
    modalId: string
    footer?: ReactNode
}

const BasicModal:FC<BasicModalProps> = ({ title, body, modalId, footer }) => {
    return (
        <div className="modal" tabIndex={-1} id={modalId}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {body}
                </div>

                {
                    footer ? (
                        footer
                    ) : (
                        <></>
                    )
                }
                
                </div>
            </div>
        </div>
      )
}

export default BasicModal