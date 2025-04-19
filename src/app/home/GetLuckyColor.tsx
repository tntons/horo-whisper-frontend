export const getLuckyColor = (color: string): string => {
    switch (color.toLowerCase()) {
      case 'black':
        return 'bg-luckyblack';
      case 'white':
        return 'bg-luckywhite';
      case 'grey':
        return 'bg-luckygrey';
      case 'red':
        return 'bg-luckyred';
      case 'orange':
        return 'bg-luckyorange';
      case 'yellow':
        return 'bg-luckyyellow';
      case 'green':
        return 'bg-luckygreen';
      case 'blue':
        return 'bg-luckyblue';
      case 'purple':
        return 'bg-luckypurple';
      case 'pink':
        return 'bg-luckypink';
      case 'brown':
        return 'bg-luckybrown';
      default:
        return 'bg-purple03'; // fallback color
    }
  };