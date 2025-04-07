export interface Match {
    match_id: number;
    match_status: string;
    match_type: string;
    match_date: string;
    match_time: string;
    venue: string;
    venue_id: number;
    series: string;
    series_id: number;
    series_type: string;
    team_a: string;
    team_a_short: string;
    team_a_img: string;
    team_a_id: number;
    team_b: string;
    team_b_short: string;
    team_b_img: string;
    team_b_id: number;
    team_a_scores?: string;
    team_b_scores?: string;
    team_a_scores_over?: { over: string; score: string }[];
    team_b_scores_over?: { over: string; score: string }[];
    toss?: string;
    result?: string;
    need_run_ball?: string;
    current_inning?: string;
    fav_team?: string;
  }
  
  export interface Series {
    series_id: number;
    series: string;
    series_type: string;
    series_date: string;
    start_date: string;
    end_date: string;
    total_matches: number;
    image: string;
  }
  
  export interface PlayerRanking {
    rank: number;
    name: string;
    country: string;
    rating: number;
    img: string;
    player_id: number;
  }
  
  export interface TeamRanking {
    rank: number;
    team: string;
    rating: number;
    point: number;
    flag: string;
  }
  
  export interface MatchDetails extends Match {
    venue_weather?: {
      temp_c: number;
      weather: string;
      weather_icon: string;
    };
    umpire?: string;
    referee?: string;
    third_umpire?: string;
    man_of_match?: string;
    man_of_match_player?: string;
    venue_scoring_pattern?: {
      first_avg_score: number;
      second_avg_score: number;
    };
    head_to_head?: {
      team_a_win_count: number;
      team_b_win_count: number;
    };
    scorecard?: {
      [key: string]: {
        team: {
          name: string;
          short_name: string;
          score: number;
          wicket: number;
          over: string;
          extras: string;
          flag: string;
        };
        batsman: {
          name: string;
          run: number;
          ball: number;
          fours: number;
          sixes: number;
          strike_rate: string;
          out_by?: string;
        }[];
        bowler: {
          name: string;
          over: string;
          maiden: number;
          run: number;
          wicket: number;
          economy: string;
        }[];
      };
    };
    commentary?: {
      [key: string]: {
        over: string;
        title: string;
        description: string;
        runs: string;
        wicket?: string;
      }[];
    };
    playing_xi?: {
      team_a: {
        name: string;
        short_name: string;
        flag: string;
        player: {
          name: string;
          play_role: string;
          image: string;
          player_id: string;
        }[];
      };
      team_b: {
        name: string;
        short_name: string;
        flag: string;
        player: {
          name: string;
          play_role: string;
          image: string;
          player_id: string;
        }[];
      };
    };
  }