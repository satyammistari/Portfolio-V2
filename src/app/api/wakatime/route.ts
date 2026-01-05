import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface WakaTimeHeartbeat {
  entity: string;
  type: string;
  time: number;
  language?: string;
  editor?: string;
  project?: string;
  category: string;
}

interface WakaTimeResponse {
  data: WakaTimeHeartbeat[];
}

export async function GET() {
  const wakaTimeApiKey = process.env.WAKATIME_API_KEY;

  if (!wakaTimeApiKey) {
    // Return fallback data if no API key
    return NextResponse.json({
      currentTask: "Building portfolio features",
      editor: "VS Code",
      language: "TypeScript",
      project: "portfolio-main",
      sessionDuration: "2h 15m",
      isActive: false,
    });
  }

  try {
    // Fetch current heartbeat from WakaTime API
    const response = await fetch(
      'https://wakatime.com/api/v1/users/current/heartbeats',
      {
        headers: {
          Authorization: `Basic ${Buffer.from(wakaTimeApiKey).toString('base64')}`,
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from WakaTime API');
    }

    const data: WakaTimeResponse = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return NextResponse.json({
        currentTask: "No recent activity",
        editor: "VS Code",
        language: "TypeScript",
        project: "portfolio-main",
        sessionDuration: "0m",
        isActive: false,
      });
    }

    const latestHeartbeat = data.data[0];
    const now = Date.now() / 1000;
    const timeSinceLastActivity = now - latestHeartbeat.time;
    const isActive = timeSinceLastActivity < 300; // Active if within 5 minutes

    // Calculate session duration (simplified)
    const sessionMinutes = Math.floor(timeSinceLastActivity / 60);
    const sessionDuration = sessionMinutes < 60 
      ? `${sessionMinutes}m`
      : `${Math.floor(sessionMinutes / 60)}h ${sessionMinutes % 60}m`;

    // Extract file/task name from entity
    const entityParts = latestHeartbeat.entity.split('/');
    const fileName = entityParts[entityParts.length - 1];
    const currentTask = fileName || "Working on code";

    return NextResponse.json({
      currentTask,
      editor: latestHeartbeat.editor || "VS Code",
      language: latestHeartbeat.language || "TypeScript",
      project: latestHeartbeat.project || "Unknown Project",
      sessionDuration,
      isActive,
    });
  } catch (error) {
    console.error('Error fetching WakaTime data:', error);
    
    // Return fallback data on error
    return NextResponse.json({
      currentTask: "System offline",
      editor: "VS Code",
      language: "TypeScript",
      project: "portfolio-main",
      sessionDuration: "0m",
      isActive: false,
    });
  }
}
