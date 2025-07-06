import "./mode.css";

function Mode({ vsComputer, vsFriend }) {
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal-container">
                    <div className="flex items-center justify-center modal-content">
                        <h1 className="text-slate-300 text-5xl text">CHECKERS</h1>
                    </div>
                    {/* <div className="modal-message">{msg}</div> */}
                    <div className="gap-4 flex right-8 absolute">
                        <button className="play-again-button" onClick={vsComputer}>
                            VS Computer
                        </button>
                        <button className="close-button" onClick={vsFriend}>
                            VS Friend
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mode;