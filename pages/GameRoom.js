import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GameProvider } from '../contexts/GameContext';
import HostPanel from '../components/role/HostPanel';
import PlayerPanel from '../components/role/PlayerPanel';
import ViewerPanel from '../components/role/ViewerPanel';

export default function GameRoom() {
  const { roomId } = useParams();
  const { userRole } = useAuth();

  return (
    <GameProvider roomId={roomId}>
      <div className="game-room">
        {userRole === 'host' && <HostPanel roomId={roomId} />}
        {userRole === 'player' && <PlayerPanel roomId={roomId} />}
        {userRole === 'viewer' && <ViewerPanel roomId={roomId} />}
      </div>
    </GameProvider>
  );
}